const prismaSoftDeleteMiddleware = async (params, next) => {
    if (params.model === 'Todo') {
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        // Tìm kiếm 1 bản ghi
        params.args.where['deleted'] = false;
      }
      if (params.action === 'findMany') {
        // Tìm kiếm nhiều bản ghi
        if (!params.args.where) {
          params.args.where = {};
        }
        params.args.where['deleted'] = false;
      }
    }
    return next(params);
  };
  
  module.exports = prismaSoftDeleteMiddleware;