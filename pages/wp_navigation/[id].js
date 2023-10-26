import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import Script from 'dangerous-html/react'
import PropTypes from 'prop-types'

import wpNavigationPageInitialPaths69f88Resource from '../../resources/wp_navigation-page-initial-paths-69f88'
import wpNavigationPageInitialPropsD1e83Resource from '../../resources/wp_navigation-page-initial-props-d1e83'

const Wpnavigation11 = (props) => {
  return (
    <>
      <div className="wpnavigation11-container">
        <Head>
          <title>Wpnavigation1 - Speedy Major Ape</title>
          <meta
            property="og:title"
            content="Wpnavigation1 - Speedy Major Ape"
          />
        </Head>
        <DataProvider
          renderSuccess={(Wp_navigationEntity) => (
            <>
              <div className="wpnavigation11-container1">
                <h1>{Wp_navigationEntity?.title?.rendered}</h1>
                <div className="wpnavigation11-container2">
                  <Script
                    html={Wp_navigationEntity?.content?.rendered}
                    className="wpnavigation11-html-node"
                  ></Script>
                </div>
              </div>
            </>
          )}
          initialData={props.wpNavigationEntity}
          persistDataDuringLoading={true}
          key={props?.wpNavigationEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .wpnavigation11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wpnavigation11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .wpnavigation11-container2 {
            width: 100%;
            align-self: stretch;
          }
          .wpnavigation11-html-node {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

Wpnavigation11.defaultProps = {
  wpNavigationEntity: [],
}

Wpnavigation11.propTypes = {
  wpNavigationEntity: PropTypes.array,
}

export default Wpnavigation11

export async function getStaticPaths() {
  try {
    const response = await wpNavigationPageInitialPaths69f88Resource({})
    return {
      paths: (response || []).map((item) => {
        return {
          params: {
            id: (item?.id).toString(),
          },
        }
      }),
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
    const response = await wpNavigationPageInitialPropsD1e83Resource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        wpNavigationEntity: response?.data?.[0],
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
