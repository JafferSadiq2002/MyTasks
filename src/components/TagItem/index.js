
import React from 'react'
import './index.css'

const TagItem = props => {
  const {tagDetails, onSelectTag, selectedTag} = props
  const {displayText, optionId} = tagDetails
  const isSelected = selectedTag === optionId ? 'selected-tag' : 'tag-button'
  const onClickTag = () => {
    onSelectTag(optionId)
  }
  return (
    <li>
      <button className={isSelected} id={optionId} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
