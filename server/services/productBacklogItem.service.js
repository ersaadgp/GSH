const ProductBacklogItemModel = require('../models/productBacklogItem.model');

class ProductBacklogItem {
  createNewProductBacklogItem(request, response) {
    const { projectID, description } = request.body;

    if (!description)
      return response.status(452).json({
        message:
          'Product bakclog description is required. Please describe the rproduct backlog.',
      });

    ProductBacklogItemModel.addProductBacklogItem(
      projectID,
      description,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  editProductBacklogItem(request, response) {
    const { pbiID, description } = request.body;
    ProductBacklogItemModel.editProductBacklogItem(
      pbiID,
      description,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getAllProductBacklogItem(request, response) {
    ProductBacklogItemModel.getProjectsProductBacklogItem(
      request.params.project_id,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }

        response.status(200).json(result);
      }
    );
  }

  getProductBacklogItemByID(request, response) {
    ProductBacklogItemModel.getProductBacklogItemByID(
      request.params.pbi_id,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }

        const { PBItemID, projectID, description } = result[0];

        ProductBacklogItemModel.isPBIBreakdowned(
          request.params.project_id,
          (error, result) => {
            if (Object.keys(error).length !== 0) {
              return response.status(500).json(error);
            }

            const isBreakdowned = result[0];

            return response.json({
              PBItemID,
              projectID,
              description,
              isBreakdowned,
            });
          }
        );
      }
    );
  }
}

module.exports = new ProductBacklogItem();
