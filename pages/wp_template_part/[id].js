import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpTemplatePartPageInitialPaths0e288Resource from '../../resources/wp_template_part-page-initial-paths-0e288'
import wpTemplatePartPageInitialProps55a36Resource from '../../resources/wp_template_part-page-initial-props-55a36'

const Wptemplatepart11 = (props) => {
  return (
    <>
      <div className="wptemplatepart11-container">
        <Head>
          <title>Wptemplatepart1 - Speedy Major Ape</title>
          <meta
            property="og:title"
            content="Wptemplatepart1 - Speedy Major Ape"
          />
        </Head>
        <DataProvider
          renderSuccess={(Wp_template_partEntity) => (
            <>
              <div className="wptemplatepart11-container1">
                <h1>{Wp_template_partEntity?.title?.rendered}</h1>
              </div>
            </>
          )}
          initialData={props.wpTemplatePartEntity}
          persistDataDuringLoading={true}
          key={props?.wpTemplatePartEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .wptemplatepart11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wptemplatepart11-container1 {
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

Wptemplatepart11.defaultProps = {
  wpTemplatePartEntity: [],
}

Wptemplatepart11.propTypes = {
  wpTemplatePartEntity: PropTypes.array,
}

export default Wptemplatepart11

export async function getStaticPaths() {
  try {
    const response = await wpTemplatePartPageInitialPaths0e288Resource({})
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
    const response = await wpTemplatePartPageInitialProps55a36Resource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        wpTemplatePartEntity: response?.data?.[0],
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
