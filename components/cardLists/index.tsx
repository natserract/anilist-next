import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ObjectType = { [k: string]: any }

type CardListsProps<T> = {
  items: T[];
  render: (data: ObjectType) => React.ReactNode
}

const CardList = <T,>(props: CardListsProps<T>) => {
  const { items, render } = props

  if (!items.length) return (
    <Grid alignItems="center" justifyContent="center" container>
      <Typography component="p" variant="body2">
        Data is empty
      </Typography>
    </Grid>
  )

  const renderMediaLists = () => {
    return items.map((item: ObjectType) => (
      <Grid key={item.id} sm={3} xs={6} item>
        {render(item)}
      </Grid>
    ))
  }

  return (
    <Grid spacing={3} container>
      {renderMediaLists()}
    </Grid>
  )
}

export default CardList