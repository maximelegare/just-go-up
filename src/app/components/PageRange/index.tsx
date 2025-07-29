import React from "react"

const defaultLabels = {
  plural: "Results",
  singular: "Result",
}

const defaultCollectionLabels = {
  posts: {
    plural: "Posts",
    singular: "Post",
  },
}

type CollectionLabels = {
  plural?: string
  singular?: string
}

export const PageRange: React.FC<{
  className?: string
  collection?: string
  collectionLabels?: CollectionLabels
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps || defaultCollectionLabels[collection || ""] || defaultLabels || {}

  return (
    <h5 className={[className, "!font-normal"].filter(Boolean).join(" ")}>
      {(typeof totalDocs === "undefined" || totalDocs === 0) && "Search produced no results."}
      {typeof totalDocs !== "undefined" &&
        totalDocs > 0 &&
        `${totalDocs} ${totalDocs > 1 ? plural : singular} - Page ${currentPage}`}
    </h5>
  )
}

// 127.1k results - Page 2
