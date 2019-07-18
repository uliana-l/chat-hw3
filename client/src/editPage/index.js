import React from 'react'
import { connect } from 'react-redux'
import { editMessage } from '../chat/actions'
import * as actions from './actions';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', id: ''};
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.id !== nextProps.data.id) {
            this.setState({
                value: nextProps.data.message,
                id: nextProps.data.id
            })
        }
    }

    componentDidMount() {
        this.props.fetchMessage(String(this.props.match.params.id));
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onCancel() {
        this.setState({ id: '', value: '' });
        this.props.history.push('/messages');
    }

    onEdit() {
        const id = String(this.props.match.params.id);
        const newMessage = {...this.props.data, message: this.state.value};
        this.props.editMessage(id, newMessage);
        this.setState({ id: '', value: '' });
        this.props.history.push('/messages');
    }

    render() {
        const message = this.state.value;
        if (this.props.error) return <div>{this.props.error}</div>
        if (this.props.loading) return <div className="spinner"></div>

        return (
            <div className="editPage">
                <form>
                    <p>Edit your message</p>
                    <textarea value={message} onChange={this.onChange}></textarea>
                    <button type='button' onClick={this.onCancel}>cancel</button>
                    <button type='button' onClick={this.onEdit}>save</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.editPage.message,
        loading: state.editPage.loading,
        error: state.editPage.error
    }
};

const mapDispatchToProps = {
    ...actions, editMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
