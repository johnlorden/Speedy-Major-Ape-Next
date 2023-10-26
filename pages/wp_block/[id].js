import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpBlockPageInitialPaths3ba1dResource from '../../resources/wp_block-page-initial-paths-3ba1d'
import wpBlockPageInitialProps1eb3bResource from '../../resources/wp_block-page-initial-props-1eb3b'

const Wpblock11 = (props) => {
  return (
    <>
      <div className="wpblock11-container">
        <Head>
          <title>Wpblock1 - Speedy Major Ape</title>
          <meta property="og:title" content="Wpblock1 - Speedy Major Ape" />
        </Head>
        <DataProvider
          renderSuccess={(Wp_blockEntity) => (
            <>
              <div className="wpblock11-container1">
                <span>{Wp_blockEntity?.date}</span>
              </div>
            </>
          )}
          initialData={props.wpBlockEntity}
          persistDataDuringLoading={true}
          key={props?.wpBlockEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .wpblock11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wpblock11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Wpblock11.defaultProps = {
  wpBlockEntity: [],
}

Wpblock11.propTypes = {
  wpBlockEntity: PropTypes.array,
}

export default Wpblock11

export async function getStaticPaths() {
  try {
    const response = await wpBlockPageInitialPaths3ba1dResource({})
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
    const response = await wpBlockPageInitialProps1eb3bResource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        wpBlockEntity: response?.data?.[0],
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
