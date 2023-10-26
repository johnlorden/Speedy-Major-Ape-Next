import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpNavigationPageInitialPaths85689Resource from '../../../resources/wp_navigation-page-initial-paths-85689'
import wpNavigationPageInitialProps6d0cfResource from '../../../resources/wp_navigation-page-initial-props-6d0cf'

const Wpnavigation1 = (props) => {
  return (
    <>
      <div className="wpnavigation1-container">
        <Head>
          <title>Wpnavigation - Speedy Major Ape</title>
          <meta property="og:title" content="Wpnavigation - Speedy Major Ape" />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(Wp_navigationEntities) => (
                  <>
                    <div className="wpnavigation1-container1">
                      <h1>{Wp_navigationEntities?.title?.rendered}</h1>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.wpNavigationEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .wpnavigation1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wpnavigation1-container1 {
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

Wpnavigation1.defaultProps = {
  wpNavigationEntities: [],
}

Wpnavigation1.propTypes = {
  wpNavigationEntities: PropTypes.array,
}

export default Wpnavigation1

export async function getStaticPaths() {
  try {
    const response = await wpNavigationPageInitialPaths85689Resource({})
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
    const response = await wpNavigationPageInitialProps6d0cfResource({
      ...context?.params,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        wpNavigationEntities: response,
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
