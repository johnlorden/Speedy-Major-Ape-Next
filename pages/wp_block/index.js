import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpBlockPageInitialProps71662Resource from '../../resources/wp_block-page-initial-props-71662'

const Wpblock = (props) => {
  return (
    <>
      <div className="wpblock-container">
        <Head>
          <title>Wpblock - Speedy Major Ape</title>
          <meta property="og:title" content="Wpblock - Speedy Major Ape" />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(Wp_blockEntities) => (
                  <>
                    <div className="wpblock-container1">
                      <span>{Wp_blockEntities?.date}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.wpBlockEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .wpblock-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wpblock-container1 {
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

Wpblock.defaultProps = {
  wpBlockEntities: [],
}

Wpblock.propTypes = {
  wpBlockEntities: PropTypes.array,
}

export default Wpblock

export async function getStaticProps(context) {
  try {
    const response = await wpBlockPageInitialProps71662Resource({
      ...context?.params,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        wpBlockEntities: response,
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
