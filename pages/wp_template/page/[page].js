import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpTemplatePageInitialPathsC9585Resource from '../../../resources/wp_template-page-initial-paths-c9585'
import wpTemplatePageInitialProps747caResource from '../../../resources/wp_template-page-initial-props-747ca'

const Wptemplate1 = (props) => {
  return (
    <>
      <div className="wptemplate1-container">
        <Head>
          <title>Wptemplate - Speedy Major Ape</title>
          <meta property="og:title" content="Wptemplate - Speedy Major Ape" />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(Wp_templateEntities) => (
                  <>
                    <div className="wptemplate1-container1">
                      <h1>{Wp_templateEntities?.title?.rendered}</h1>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.wpTemplateEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .wptemplate1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wptemplate1-container1 {
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

Wptemplate1.defaultProps = {
  wpTemplateEntities: [],
}

Wptemplate1.propTypes = {
  wpTemplateEntities: PropTypes.array,
}

export default Wptemplate1

export async function getStaticPaths() {
  try {
    const response = await wpTemplatePageInitialPathsC9585Resource({})
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
    const response = await wpTemplatePageInitialProps747caResource({
      ...context?.params,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        wpTemplateEntities: response,
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
