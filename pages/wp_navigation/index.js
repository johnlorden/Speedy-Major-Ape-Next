import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpNavigationPageInitialPropsD2b48Resource from '../../resources/wp_navigation-page-initial-props-d2b48'

const Wpnavigation = (props) => {
  return (
    <>
      <div className="wpnavigation-container">
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
                    <div className="wpnavigation-container1">
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
          .wpnavigation-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wpnavigation-container1 {
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

Wpnavigation.defaultProps = {
  wpNavigationEntities: [],
}

Wpnavigation.propTypes = {
  wpNavigationEntities: PropTypes.array,
}

export default Wpnavigation

export async function getStaticProps(context) {
  try {
    const response = await wpNavigationPageInitialPropsD2b48Resource({
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
