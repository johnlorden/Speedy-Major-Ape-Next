import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import wpTemplatePageInitialPropsB00bcResource from '../../resources/wp_template-page-initial-props-b00bc'

const Wptemplate = (props) => {
  return (
    <>
      <div className="wptemplate-container">
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
                    <div className="wptemplate-container1">
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
          .wptemplate-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .wptemplate-container1 {
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

Wptemplate.defaultProps = {
  wpTemplateEntities: [],
}

Wptemplate.propTypes = {
  wpTemplateEntities: PropTypes.array,
}

export default Wptemplate

export async function getStaticProps(context) {
  try {
    const response = await wpTemplatePageInitialPropsB00bcResource({
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
