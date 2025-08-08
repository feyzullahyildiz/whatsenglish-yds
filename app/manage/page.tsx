import React from "react";

import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto container">
      Page
      <h1>Yönetim Sayfası</h1>
      <Link href="/manage/create" className="">
        Yeni Oluştur
      </Link>
    </div>
  );
}
