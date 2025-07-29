import { capitalize } from "@app/utilities/strings/catpitalize"
import React from "react"

const defaultLabels = {
  plural: "Results",
  singular: "Result",
}

type CollectionLabels = {
  plural?: string
  singular?: string
}

export const PageRange: React.FC<{
  category: string
  className?: string
  collection?: string
  collectionLabels?: CollectionLabels
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const { className, currentPage, limit, totalDocs, category } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } = defaultLabels || {}

  return (
    <h5 className={[className, "!font-normal flex items-center gap-2"].filter(Boolean).join(" ")}>
      {(typeof totalDocs === "undefined" || totalDocs === 0) && "Search produced no results."}
      {typeof totalDocs !== "undefined" && totalDocs > 0 && (
        <React.Fragment>
          <span className="font-bold">{capitalize(category)}</span>
          <span>
            {totalDocs} {totalDocs > 1 ? plural : singular} - Page {currentPage}
          </span>
        </React.Fragment>
      )}
    </h5>
  )
}
