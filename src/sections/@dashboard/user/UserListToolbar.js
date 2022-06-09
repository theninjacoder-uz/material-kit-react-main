import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
// material
import {styled} from '@mui/material/styles';
import {Button, InputAdornment, OutlinedInput, Toolbar, Tooltip, Typography} from '@mui/material';
// component
import axios from "axios";
import Cookies from 'js-cookie';
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------
const HOME_URL = "http://ec2-34-233-123-100.compute-1.amazonaws.com:8080/api/v1/home/";

const RootStyle = styled(Toolbar)(({theme}) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({theme}) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {width: 320, boxShadow: theme.customShadows.z8},
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    },
}));


// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
    selected: PropTypes.array,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
};

export default function UserListToolbar({selected, filterName, onFilterName}) {
    const navigate = useNavigate();
    const handleClick = (selected, btnType) => {


        axios.put(HOME_URL + btnType, {userIds: selected}, {headers: {Authorization: localStorage.getItem("jwtToken")}}).then(res => {
            if (res.status === 200) {
                console.log("inside userLIstToolBar", res);
                navigate("/");
                // navigate("/", {replace: true})
            } else {
                navigate("/logout");
            }
        }).catch(() => {
            navigate("/login");
        })

    }

    return (
        <RootStyle
            sx={{
                ...(selected.length > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                }),
            }}
        >
            {selected.length > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {selected.length} selected
                </Typography>
            ) : (
                <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{color: 'text.disabled', width: 20, height: 20}}/>
                        </InputAdornment>
                    }
                />
            )}

            {selected.length > 0 ? (
                [<Tooltip title="Block" key='1'>
                    <Button color="error" onClick={() => {
                        handleClick(selected, "block")
                    }}>
                        Block
                    </Button>
                </Tooltip>,
                    <Tooltip title="Unlock" key='2'>
                        <Button color="primary" onClick={() => {
                            handleClick(selected, "unblock")
                        }}>
                            <Iconify icon="eva:unlock-fill" size='large'/>
                        </Button>

                    </Tooltip>,
                    <Tooltip title="Delete" key='3'>
                        <Button onClick={() => {
                            handleClick(selected, "delete")
                        }}>
                            <Iconify icon="eva:trash-2-fill"/>
                        </Button>

                    </Tooltip>]
            ) : (
                <></>
            )}
        </RootStyle>
    );
}
