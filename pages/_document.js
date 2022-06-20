import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#013355" />
                    <meta name="msapplication-TileColor" content="#defff9" />
                    <meta name="theme-color" content="#defff9" />
                    <meta name="monetization" content="$ilp.uphold.com/rewb2d8aQLYQ" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://kit.fontawesome.com/c3d50f0baf.js" crossOrigin="anonymous"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
