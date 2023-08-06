import { ImgHTMLAttributes } from 'react' 
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  console.log(props)
  return (
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      {...props} //Com esse props eu chamo todas as propriedades de uma imagem e não preciso ficar colocando uma por uma
    />
  );
}