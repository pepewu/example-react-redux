import React, {Component} from 'react';
import { connect } from 'react-redux';

class Messanger extends Component {
    render() {
        return(
            <div className="messanger">
                {this.props.store_msgs.map(msg => (
                    <div key={msg.id} className="msg">{msg.text}</div>
                ))}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        store_msgs: state.messanger.msgs
    }
}

export default connect(mapStateToProps)(Messanger);