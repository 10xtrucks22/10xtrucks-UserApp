import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import { Button, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { BASE_URL } from "../config";
import createAuthStore from "../store/AuthStore";






const optionsPerPage = [10, 15, 20];

const PackageScreen = () => {
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const token = createAuthStore((state) => state.token);
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const url = `${BASE_URL}/api/user/packages?page=${page}&limit=${itemsPerPage}`;
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
        setData(response.data.data.trips);
      }
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    let controller = new AbortController();
    (
      async () => {
        await fetchData();
      }
    )();
    return () => controller.abort();
  }, [page, itemsPerPage]);

  return (
    <>
  


      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Start</DataTable.Title>
          <DataTable.Title >Destination</DataTable.Title>
          <DataTable.Title >Distance</DataTable.Title>
          <DataTable.Title >Price</DataTable.Title>
          <DataTable.Title >Status</DataTable.Title>
          <DataTable.Title >Actions</DataTable.Title>
        </DataTable.Header>

        {data.map((row) => (
          <DataTable.Row key={row.id}>
            <DataTable.Cell>{row.start_location}</DataTable.Cell>
            <DataTable.Cell>{row.end_location}</DataTable.Cell>
            <DataTable.Cell >{row.total}</DataTable.Cell>
            <DataTable.Cell> {row.current_status}</DataTable.Cell>
            <DataTable.Cell >
              <Button title="Details" onPress={() => {
                navigation.navigate('TripDetails', {
                  trip: row,
                });
              }}
              />

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
    </>
  );

};

export default PackageScreen;
