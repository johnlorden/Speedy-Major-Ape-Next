import { normalize } from '@teleporthq/cms-mappers/wordpress'

export default async function (params = {}) {
  const urlParams = {
    ...(params['page'] && {
      page: params['page'],
    }),
    per_page: '10',
  }
  const data = await fetch(
    `${process.env.CMS_URL}/wp-json/wp/v2/menu-items?${new URLSearchParams(
      urlParams
    )}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`,
      },
    }
  )
  const response = data
  return normalize(response, params)
}
