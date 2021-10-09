import { Drawer, Grow, makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { setStateTypes } from '../../types'
import clsx from 'clsx'
import TodoListService from '../../services/TodoListService'
import colors from '../../utils/todoList'

const useStyle = makeStyles(theme => ({
  drawer: {
    width: '400px',
    margin: theme.spacing(2, 0, 0, 0),
  },
  menu: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  box: {
    width: '45%',
    height: '90px',
    borderRadius: '9px',
    marginBottom: theme.spacing(2),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  colorImg: {
    backgroundImage: `url(https://images.pexels.com/photos/226589/pexels-photo-226589.jpeg?cs=srgb&dl=closeup-photo-of-multi-color-stick-226589.jpg&fm=jpg)`,
  },
  photo: {
    backgroundImage: `url(https://images.pexels.com/photos/755726/pexels-photo-755726.jpeg?cs=srgb&dl=astronomy-astrophotography-clouds-colors-755726.jpg&fm=jpg)`,
  },
}))

interface Props {
  open: boolean
  setOpen: setStateTypes<boolean>
  setBackground: setStateTypes<string>
}

const SideMenu = ({ open, setOpen, setBackground }: Props) => {
  const classes = useStyle()

  const [openOption, setOpenOption] = useState<string | null>(null)
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await TodoListService.getImages()
      setImages(data)
    }
    fetchData()
  }, [])

  const changeBackground = useCallback(
    bg => {
      TodoListService.setBackground(bg)
      setBackground(bg)
    },
    [setBackground]
  )

  return (
    <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
      <div className={classes.drawer}>
        <div className={classes.menu}>
          <div
            className={clsx(classes.box, classes.photo)}
            onClick={() => setOpenOption('image')}
          />
          <div
            className={clsx(classes.box, classes.colorImg)}
            onClick={() => setOpenOption('color')}
          />
        </div>
        {openOption === 'color' && (
          <Grow in={true}>
            <div className={classes.menu}>
              {colors.map(color => (
                <div
                  key={color}
                  className={classes.box}
                  style={{ background: color }}
                  onClick={() => changeBackground(color)}
                />
              ))}
            </div>
          </Grow>
        )}
        {openOption === 'image' && (
          <Grow in={true}>
            <div className={classes.menu}>
              {images.map(image => (
                <div
                  key={image.id}
                  className={classes.box}
                  style={{ backgroundImage: `url(${image.thumb})` }}
                  onClick={() =>
                    changeBackground(
                      `url(${image.full}) no-repeat center center/cover`
                    )
                  }
                />
              ))}
            </div>
          </Grow>
        )}
      </div>
    </Drawer>
  )
}

export default SideMenu
