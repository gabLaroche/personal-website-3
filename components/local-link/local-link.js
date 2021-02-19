import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

function LocalLink({href, children}) {
    const router = useRouter();

    return (
        <Link href={href} locale={router.locale}>
            {children}
        </Link>
    )
}
export default LocalLink
