import React from 'react';
import FeedsIndexRow from './feeds_index_row';
import AddFeedFormContainer from './add_feeds_form_container';

export class FeedsIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  render() {
    const feedsIndexRows = this.props.feeds.map(feed => {
      return <FeedsIndexRow key={feed.id}
        updateFeed={this.props.updateFeed}
        deleteFeed={this.props.deleteFeed}
        feed={feed} />;
    });

    return (
      <div className="feeds-index-container">
        <h1>Organize Sources</h1>
        <div className="feeds-index">
          <AddFeedFormContainer />
          <div>
            <table className="feeds-table">
              <thead>
                <tr className="feed-header-row">
                  <th className="feed-source-header">Source Name</th>
                  <th className="feed-status-header">Status</th>
                  <th className="feed-modify-header"></th>
                </tr>
              </thead>
              <tbody>
                {feedsIndexRows}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default FeedsIndex;
