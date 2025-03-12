import React from "react";
import useGetCategory from "../../hooks/useGetCategory";

export default function Category() {
  const { category, categoryLoading, refresh } = useGetCategory();
  console.log(category);

  return <div>Category</div>;
}
