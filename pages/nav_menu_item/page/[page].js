import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import navMenuItemPageInitialPathsC9f0fResource from '../../../resources/nav_menu_item-page-initial-paths-c9f0f'
import navMenuItemPageInitialProps35930Resource from '../../../resources/nav_menu_item-page-initial-props-35930'

const Navmenuitem1 = (props) => {
  return (
    <>
      <div className="navmenuitem1-container">
        <Head>
          <title>Navmenuitem - Speedy Major Ape</title>
          <meta property="og:title" content="Navmenuitem - Speedy Major Ape" />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(Nav_menu_itemEntities) => (
                  <>
                    <div className="navmenuitem1-container1">
                      <h1>{Nav_menu_itemEntities?.title}</h1>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.navMenuItemEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .navmenuitem1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .navmenuitem1-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Navmenuitem1.defaultProps = {
  navMenuItemEntities: [],
}

Navmenuitem1.propTypes = {
  navMenuItemEntities: PropTypes.array,
}

export default Navmenuitem1

export async function getStaticPaths() {
  try {
    const response = await navMenuItemPageInitialPathsC9f0fResource({})
    const headers = Object.fromEntries(response)
    const totalCount = headers?.['x-wp-total']
    const pagesCount = Math.ceil(totalCount / 10)
    return {
      paths: Array.from(
        {
          length: pagesCount,
        },
        (_, i) => ({
          params: {
            page: (i + 1).toString(),
          },
        })
      ),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await navMenuItemPageInitialProps35930Resource({
      ...context?.params,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        navMenuItemEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
