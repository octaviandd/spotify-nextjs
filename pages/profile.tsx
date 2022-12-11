import { useSession } from 'next-auth/react';
import React from 'react';
import AccessDenied from '../components/AccessDenied';
import Layout from '../components/Layout';

type Props = {}

export default function Profile({ }: Props) {
  const {data: session} = useSession()

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>profile</div>
    </Layout>
  )
}