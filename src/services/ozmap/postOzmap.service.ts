import { Response, Request } from "express";

import getBoxService from "../boxes/getBox.service";
import getClientService from "../clients/getClient.service";
import getSplitterService from "../splitters/getSplitter.service";

import api from "../../api/api";
import logger from "../../utils/Logger";
import { BoxModel } from "../../models/Box";

const createBoxes = async (res: Response, listBoxes: any) => {
  const boxesRequest = listBoxes.map(async (box: any) => {
    try {
      const res = await api.post("boxes", {
        name: box.name,
        lat: box.lat,
        lng: box.lng,
        boxType: box.boxType,
        implanted: true,
        project: box.project,
        hierarchyLevel: box.hierarchyLevel,
      });

      logger.info(`Box ${box.name} created`);
    } catch (error: any) {
      logger.error(
        `Request failed. Box ${box.name} cant be created. Message: ${error.message}`
      );
    }
  });

  try {
    await Promise.allSettled(boxesRequest);
    logger.info("Boxes created");
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ message: "Error" });
  }

  return boxesRequest;
};

const createSplitters = async (
  res: Response,
  boxesCreated: any,
  listBoxes: any
) => {
  const listSplitters = await getSplitterService();

  const splittersRequest = listSplitters.map(async (splitter) => {
    try {
      const boxSaved = await BoxModel.findOne({ _id: splitter.parent });
      const boxParentId = boxesCreated.find(
        (box: any) => box.name == boxSaved?.name
      );
      if (boxParentId) {
        const res = await api.post("splitters", {
          name: splitter.name,
          implanted: splitter.implanted,
          isDrop: splitter.isDrop,
          parent: boxParentId?.id,
          project: splitter.project,
          splitterType: splitter.splitterType,
          ratio: splitter.ratio,
        });
        logger.info(`Splitter ${splitter.name} created`);
      }
    } catch (error: any) {
      logger.error(
        `Request failed. Splitter ${splitter.name} cant be created. Message: ${error.message}`
      );
    }
  });

  try {
    await Promise.allSettled(splittersRequest);
    logger.info("Splitters created");
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ message: "Error" });
  }

  return splittersRequest;
};

const createClients = async (
  res: Response,
  boxesCreated: any,
  listBoxes: any
) => {
  const listClients = await getClientService();

  const clientsRequest = listClients.map(async (client) => {
    try {
      const boxSaved = await BoxModel.findOne({ _id: client.box });
      const boxParentId = boxesCreated.find(
        (box: any) => box.name == boxSaved?.name
      );
      if (boxParentId) {
        const res = await api.post("properties", {
          address: client.address,
          project: client.project,
          box: boxParentId?.id,
          lat: client.lat,
          lng: client.lng,
          force: client.force,
          auto_connect: client.auto_connect,
          client: {
            implanted: client.implanted,
            name: client.name,
            code: client.code,
            status: client.status,
          },
        });
        logger.info(`Client ${client.name} created`);
      }
    } catch (error: any) {
      logger.error(
        `Request failed. Client ${client.name} cant be created. Message: ${error.message}`
      );
    }
  });

  try {
    await Promise.allSettled(clientsRequest);
    logger.info("Clients created");
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ message: "Error" });
  }

  return clientsRequest;
};

const postOzmapService = async (res: Response, req: Request) => {
  const listBoxes = await getBoxService();
  const listSplitters = await getSplitterService();

  //Criando boxes
  await createBoxes(res, listBoxes);

  //Criando splitters
  const boxes = await api.get("boxes");
  const boxesCreated = boxes.data.rows;
  await createSplitters(res, boxesCreated, listBoxes);

  //Criando clients
  await createClients(res, boxesCreated, listBoxes);
  logger.info("Tudo criado com sucesso");
  return {};
};

export default postOzmapService;
