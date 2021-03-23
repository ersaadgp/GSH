const AccessManager = require('../services/accessManager.service');
const express = require('express');
const ProductBacklogItem = require('../services/productBacklogItem.service');

const router = express.Router();

router.post(
  '/',
  AccessManager.getProductOwnerPermissionLevel,
  ProductBacklogItem.createNewProductBacklogItem
);

router.patch(
  '/',
  AccessManager.getScrumMasterPermissionLevel,
  ProductBacklogItem.editProductBacklogItem
);

router.get('/project/:project_id', ProductBacklogItem.getAllProductBacklogItem);

router.get('/id/:pbi_id', ProductBacklogItem.getProductBacklogItemByID);

module.exports = router;
