import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpTemplatePartPageInitialProps141c5Resource from '../../resources/wp_template_part-page-initial-props-141c5'

const Wptemplatepart = (props) => {
  return (
    <>
      <div className="wptemplatepart-container">
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
                    <div className="wptemplatepart-container1">
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
          .wptemplatepart-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wptemplatepart-container1 {
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

Wptemplatepart.defaultProps = {
  wpTemplatePartEntities: [],
}

Wptemplatepart.propTypes = {
  wpTemplatePartEntities: PropTypes.array,
}

export default Wptemplatepart

export async function getStaticProps(context) {
  try {
    const response = await wpTemplatePartPageInitialProps141c5Resource({
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
