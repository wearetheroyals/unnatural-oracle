import React from 'react';
import { Helmet } from 'react-helmet';

const title = 'Unnatural Oracle by The Royals';
const titleShort = 'Oracle';
const descriptionShort = 'Introduce some unnatural change into your day.';
const description = `Stuck in a creative rut? Need to shift your perspective? ${descriptionShort}`;
// const siteRoot = `${window.location.protocol}//${window.location.hostname}`;
const siteRoot = `/`;

const htmlHead = (
  <Helmet>
    <title>{title}</title>
    <meta name='title' content={titleShort} />
    <meta name='description' content={description} />

    <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />

    <meta property='og:type' content='website' />
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />

    <meta property='og:image' content={`${siteRoot}/screenshot.png`} />
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:title' content={title} />
    <meta property='twitter:description' content={description} />
    <meta property='twitter:image' content={`${siteRoot}/screenshot.png`} />
  </Helmet>
);

export default htmlHead;
