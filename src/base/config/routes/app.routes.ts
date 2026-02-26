const productsRoot = 'products'

const v1 = 'v1'

export const routesV1 = {
  version: v1,
  product: {
    root: productsRoot,
    byId: `${productsRoot}/:id`,
  },
}
