import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@ngo/Student';
// mock
import CustomModal from '../../components/CustomModal';
import { db } from '../../utils/firebaseConfig';
import AddStudent from '../../sections/@ngo/forms/AddStudent';
import AddRedSpot from './AddRedSpot';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.POCName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.POCEmail.includes(query.toLowerCase()) ||
        _user.POCPhone.includes(query.toLowerCase()) ||
        _user.address.includes(query.toLowerCase())
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RedSpotList() {
  const [page, setPage] = useState(0);

  const user = useSelector((state) => state.auth.user);

  const [USERLIST, setUSERLIST] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    setUSERLIST(user.redSpots);
  }, [user]);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(()=>{
    changeLanguage("bn")
  },[])


  const TABLE_HEAD = [
    { id: 'pocname', label: t('NgoRedSpots.NgoPocName'), alignRight: false },
    { id: 'pocemail', label: t('NgoRedSpots.NgoPocEmail'), alignRight: false },
    { id: 'pocphone', label: t('NgoRedSpots.NgoPocPhone'), alignRight: false },
    { id: 'coords', label: t('NgoRedSpots.NgoCoordinates'), alignRight: false },
    { id: 'address', label: t('NgoRedSpots.NgoAddress'), alignRight: false },
    { id: '' },
  ];

  return (
    <Page title="Red Spots">
      <Container>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, Id) => {
                    const { POCEmail, POCName, POCPhone, address, coordinates } = row;
                    const isItemSelected = selected.indexOf(POCName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={Id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, POCName)} />
                        </TableCell>

                        <TableCell align="left">{POCName}</TableCell>
                        <TableCell align="left">{POCEmail}</TableCell>
                        <TableCell align="left">{POCPhone}</TableCell>
                        <TableCell align="left">{coordinates}</TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu document={row} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
