import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpTemplatePartPageInitialPaths0f8a5Resource from '../../../resources/wp_template_part-page-initial-paths-0f8a5'
import wpTemplatePartPageInitialProps0f552Resource from '../../../resources/wp_template_part-page-initial-props-0f552'

const Wptemplatepart1 = (props) => {
  return (
    <>
      <div className="wptemplatepart1-container">
        <Head>
          <title>Wptemplatepart - Speedy Major Ape</title>
          <meta
            property="og:title"
            content="Wptemplatepart - Speedy Major Ape"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(Wp_template_partEntities) => (
                  <>
                    <div className="wptemplatepart1-container1">
                      <h1>{Wp_template_partEntities?.title?.rendered}</h1>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.wpTemplatePartEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .wptemplatepart1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wptemplatepart1-container1 {
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

Wptemplatepart1.defaultProps = {
  wpTemplatePartEntities: [],
}

Wptemplatepart1.propTypes = {
  wpTemplatePartEntities: PropTypes.array,
}

export default Wptemplatepart1

export async function getStaticPaths() {
  try {
    const response = await wpTemplatePartPageInitialPaths0f8a5Resource({})
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
    const response = await wpTemplatePartPageInitialProps0f552Resource({
      ...context?.params,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        wpTemplatePartEntities: response,
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
