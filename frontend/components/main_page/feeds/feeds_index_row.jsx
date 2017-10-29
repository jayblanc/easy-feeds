import React from 'react';

class FeedsIndexRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({ renaming: false, isMouseInside: true }, this.props.feed);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  handleEdit() {
    return e => {
      e.preventDefault();
      this.props.updateFeed(this.state);
      this.state.renaming = false;
    };
  }

  handleEditChange(e) {
    this.setState({subscription_title: e.target.value});
  }

  handleDelete(feed) {
    return e => this.props.deleteFeed(feed);
  }

  subscriptionTitleForm(feed) {
    return (
      this.state.renaming ?
        <form className="feed-rename-form"
          onSubmit={this.handleEdit()}>
          <input type="text"
            value={this.state.subscription_title}
            onChange={e => this.handleEditChange(e)}
            />
          <button><i className="fa fa-check" aria-hidden="true"></i></button>
        </form>
      :
      <div className="feed-name-show">
        {this.state.subscription_title}
        { this.state.isMouseInside ?
          <button className="modify-button feed-rename"
            onClick={e => this.setState(
              { renaming: true }
            )}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          : null
        }
      </div>
    );
  }

  // this.setState({ isMouseInside: true })

  //  this.setState({ isMouseInside: false });

  render() {
    const { feed } = this.props;
    return (
      <tr className="feed-index-row"
        onMouseEnter={e => {
          //
          }
        }
        onMouseLeave={e => {
          //
          }
        }
      >
      <td className="feed-source-name">
        <img src={feed.image_url} className="feed-index-icon"/>
        {this.subscriptionTitleForm(feed)}
      </td>
      <td className="feed-status-text">{feed.status}</td>
      <td className="feed-delete-cell">
        { this.state.isMouseInside ?
          <div>
            <button className="modify-button feed-delete"
              onClick={this.handleDelete(feed)}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
          : null
        }
      </td>
      </tr>
    );
  }
}

export default FeedsIndexRow;
