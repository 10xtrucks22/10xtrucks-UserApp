import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import { Button, DataTable } from "react-native-paper";
import { BASE_URL } from "../config";
import createAuthStore from "../store/AuthStore";

const optionsPerPage = [10, 15, 20];

const InvoiceScreen = () => {
  const navigation = useNavigation();


  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const token = createAuthStore((state) => state.token);
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const url = `${BASE_URL}/api/user/invoices?page=${page}&limit=${itemsPerPage}`;
      // console.log(url)
      const header = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };
      const response = await axios({
        method: "get",
        url: url,
        headers: header,
      });
      if (response.data.success == true) {
        setPage(response.data.meta.current_page);
        setTotalPage(response.data.meta.last_page);
        setData(response.data.data.invoices);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    let controller = new AbortController();
    (
      async () => {
        await  fetchData();
      }
    )();
    return () => controller.abort();
  }, [page, itemsPerPage]);

  return (
    <DataTable>
      
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Total</DataTable.Title>
        <DataTable.Title numeric>Stats</DataTable.Title>
        <DataTable.Title>Action</DataTable.Title>
      </DataTable.Header>

      {data.map((row) => (
        <DataTable.Row key={row.id}>
          <DataTable.Cell >{row.created_at}</DataTable.Cell>
          <DataTable.Cell numeric>{row.total}</DataTable.Cell>
          <DataTable.Cell numeric>{row.status}</DataTable.Cell>
          <DataTable.Cell onPress={() => {
            navigation.navigate('InvoicesDetails', {
              invoice: row,
            });
          }}>
            <Button>
              Details
            </Button>
          </DataTable.Cell>

        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={totalPage}
        onPageChange={(page) => setPage(page)}
        label={`${page}-${totalPage} of ${totalPage}`}
        showFastPaginationControls
        numberOfItemsPerPageList={optionsPerPage}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};

export default InvoiceScreen;
