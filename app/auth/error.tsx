"use client";

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return <div>This is login error: {"Invalid credentials!"}</div>;
}
