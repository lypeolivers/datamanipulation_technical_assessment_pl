import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import XLSX from "xlsx";
import axios from "axios";
import { BoxModel } from "../../models/Box";
import { SplitterModel } from "../../models/Splitter";
import { ClientModel } from "../../models/Client";
import "dotenv/config";
import getBoxService from "../boxes/getBox.service";
import logger from "../../utils/Logger";
import { IBoxImport } from "../../types/Box";
import { ISplitterImport } from "../../types/Splitter";
import { IClientImport } from "../../types/Client";
import api from "../../api/api";

const importBoxes = async (
  data: any,
  boxTypesList: any,
  projectObject: any,
  res: Response
) => {
  const boxesImport = Promise.all(
    data.map(async (box: IBoxImport) => {
      const boxTypesId = boxTypesList.filter((types: any) => {
        return types.code == box.Type;
      });
      const newBoxObject = {
        _id: new ObjectId(),
        name: box.Name,
        lat: box.Latitude,
        lng: box.Longitude,
        boxType: boxTypesId[0].id,
        hierarchyLevel: box.Level,
        project: projectObject.id,
      };
      const newBox = new BoxModel(newBoxObject);
      try {
        await newBox.save();
        logger.info(`Box ${box.Name} created`);
        return newBoxObject;
      } catch (error: any) {
        logger.error(error.message);
        return new Error(error.message);
      }
    })
  );
  logger.info("Boxes created");
  return boxesImport;
};

const importSplitters = async (
  data: any,
  splitterTypesList: any,
  boxesList: any,
  projectObject: any
) => {
  const splittersImport = Promise.all(
    data.map(async (splitter: ISplitterImport) => {
      const splitterTypesId = splitterTypesList.filter((types: any) => {
        return types.code == splitter.Type;
      });

      const boxParentId = boxesList.filter((box: any) => {
        return box.name == splitter.Box;
      });
      const newSplitterObject = {
        name: splitter.Name,
        splitterType: splitterTypesId[0].id,
        parent: boxParentId[0] ? boxParentId[0].id : null,
        implanted: splitter.implanted == "Yes" ? true : false,
        ratio: {
          output: splitter.Outputs,
          input: splitter.Inputs,
        },
        isDrop: splitter["Allows client connection"] == "Yes" ? true : false,
        project: projectObject.id,
      };
      const newSplitter = new SplitterModel(newSplitterObject);
      try {
        await newSplitter.save();
        logger.info(`Splitter ${splitter.Name} created`);
        return newSplitterObject;
      } catch (error: any) {
        logger.error(error.message);
        return new Error(error.message);
      }
    })
  );
  logger.info("Splitters created");
  return splittersImport;
};

const importClients = async (data: any, boxesList: any, projectObject: any) => {
  const randomUser: any = await axios.get(
    `https://randomuser.me/api?results=${data.length}&nat=br`
  );

  const clientsImport = Promise.all(
    data.map(async (client: IClientImport, index: number) => {
      const boxParentId = boxesList.filter((box: any) => {
        return box.name == client.Box;
      });
      const resultUser = randomUser.data.results[index];

      if (boxParentId) {
        const newClientObject = {
          name: resultUser.name.first + " " + resultUser.name.last,
          code:
            resultUser.name.first.toLowerCase() +
            "." +
            resultUser.name.last.toLowerCase(),
          lat: client.Latitude,
          lng: client.Longitude,
          box: boxParentId[0] ? boxParentId[0].id : null,
          status: client.Status == "OK" ? 0 : 1,
          address:
            resultUser.location.street.name +
            " " +
            resultUser.location.street.number +
            " " +
            resultUser.location.postcode +
            " " +
            resultUser.location.city +
            " " +
            resultUser.location.state +
            " " +
            resultUser.location.country,
          project: projectObject.id,
          auto_connect: true,
          force: true,
          implanted: true,
        };
        const newClient = new ClientModel(newClientObject);
        try {
          await newClient.save();
          logger.info(`Client ${resultUser.name.first} created`);
          return newClientObject;
        } catch (error: any) {
          logger.error(error.message);
          return new Error(error.message);
        }
      }
    })
  );
  logger.info("Clients created");
  return clientsImport;
};

const importBoxTypes = async (res: Response) => {
  try {
    const { data } = await api.get("box-types");
    const boxTypes = data.rows;
    return boxTypes;
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ message: "Error boxTypes" });
  }
};

const importSplitterTypes = async (res: Response) => {
  try {
    const { data } = await api.get("splitter-types");
    const result = data.rows;
    return result;
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ message: "Error splitterTypesObject" });
  }
};

const importProjects = async (res: Response) => {
  try {
    const { data } = await api.get("projects");
    const projectObject = data.rows[0];
    return projectObject;
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ message: "Error projectObject" });
  }
};

const readOzmapService = async (res: Response, filePath: string) => {
  const excelData = XLSX.readFile(filePath);
  const json = Object.keys(excelData.Sheets).map((name) => ({
    name,
    data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
  }));

  let dataExcelBox: any[] = [];
  let dataExcelSplitter: any[] = [];
  let dataExcelClient: any[] = [];

  json.map(async (item: any) => {
    if (item.name == "Boxes") dataExcelBox = item.data;
    if (item.name == "Splitters") dataExcelSplitter = item.data;
    if (item.name == "Clients") dataExcelClient = item.data;
  });

  //salvando box
  const boxTypesList = await importBoxTypes(res);
  const projectObject = await importProjects(res);
  const boxesAll = await importBoxes(
    dataExcelBox,
    boxTypesList,
    projectObject,
    res
  );

  //salvando splitter
  const boxesList = await getBoxService();
  const splitterTypesList = await importSplitterTypes(res);
  const splittersAll = await importSplitters(
    dataExcelSplitter,
    splitterTypesList,
    boxesList,
    projectObject
  );

  //salvando client
  const clientsAll = await importClients(
    dataExcelClient,
    boxesList,
    projectObject
  );

  return { boxes: boxesAll, splitters: splittersAll, clients: clientsAll };
};

export default readOzmapService;
