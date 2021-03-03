import React from 'react'
import { Grid, Button, Container, Icon, Card } from 'semantic-ui-react';
import axios from 'axios'

class Hello extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      data: null,
      error: null
    }
    this.fetchData = this.fetchData.bind(this)
  }

  fetchData() {
    this.setState({ fetching: !this.state.fetching })
    setTimeout(() => {
      axios.get('/test')
        .then(response => {
          this.setState({ data: response.data, error: null })
        })
        .catch(error => {
          this.setState({ error: error.response.data, data: null})
        })
        .finally(() => {
          this.setState({ fetching: !this.state.fetching })
        })
    }, 3000)
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Button icon loading={this.state.fetching} onClick={this.fetchData} disabled={this.state.fetching} >
                Fetch Info
                <Icon name='info circle' />
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {this.state.data && <Card>
              <Card.Content>
                Message: {this.state.data.message}
              </Card.Content>
            </Card>}
            {this.state.error && <p> {this.state.error.message} </p>}
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

}

export default Hello
