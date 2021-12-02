import React,{useContext} from 'react'
import {Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core'
import useStyles from './styles'
import Form from './Form/Form'
import List from './List/List'
import {ExpenseTrackerContext} from '../../context/context'

const Main = () => {
    const {balance} = useContext(ExpenseTrackerContext)
    const classes = useStyles()
    return (
        <Card className={classes.root}>

            <CardHeader title="Expense Tracker" subheader="Powered by Johnny Basgallop"/>

            <CardContent>
                <Typography align="center" variant="h5">Total balance: £{balance}</Typography>
                <Typography variant="subtitle1" style={{lineHeight: '1.5em', marginTop: '20px'}}>
                    {/* InfoCard... */}
                    Try saying: Add income for £100 in Category salary for monday...
                </Typography>

                <Divider/>
                <Form/>

            </CardContent>

            <CardContent className={classes.CardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
