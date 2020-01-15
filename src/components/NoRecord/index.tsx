import React from 'react';
import './index.css';

interface Props {
  message: string;
}
export default function NoRecord({ message = '' }: Props) {
  return <div className="norecord">{message}</div>;
}
