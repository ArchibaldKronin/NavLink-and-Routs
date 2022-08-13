import React from 'react'
import styles from './ItemContainer.module.css';
import cn from 'classnames';

export const ItemContainer = ({children, customClassName}) => {
  return (
    <div className={cn(styles.ItemContainer, customClassName)}>{children}</div>
  )
}
