import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import { Button, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { BASE_URL } from "../config";
import createAuthStore from "../store/AuthStore";
import RangeSlider from 'rn-range-slider';
import Thumb from "../components/ranger/Thumb";
import Rail from "../components/ranger/Rail";
import RailSelected from "../components/ranger/RailSelected";
import Label from "../components/ranger/Label";
import Notch from "../components/ranger/Notch";





const optionsPerPage = [10, 15, 20];

const PackageScreen = () => {
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const token = createAuthStore((state) => state.token);
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();

  const [low, setLow] = React.useState(0);
  const [high, setHigh] = React.useState(1000);


  const renderThumb = React.useCallback(() => <Thumb />, []);
  const renderRail = React.useCallback(() => <Rail />, []);
  const renderRailSelected = React.useCallback(() => <RailSelected />, []);
  const renderLabel = React.useCallback(value => <Label text={value} />, []);
  const renderNotch = React.useCallback(() => <Notch />, []);
  const handleValueChange = React.useCallback((low, high) => {
    setLow(low);
    setHigh(high + 10);

  }, [low, high]);





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
      {/* <View style={{ flex: 1, paddingHorizontal: 20, maxHeight: 160 }}>
        <View style={{ flex: 1, padding: 40, flexDirection: "column", justifyContent: "space-evenly" }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <View>
              <Text
                style={[
                  { fontStyle: "italic" },
                  { textAlign: "left", fontSize: 14 }
                ]}
              >
                Min
              </Text>
              <Text
                style={[{ fontWeight: "bold" }, { fontSize: 18, color: "#000000" }]}
              >
                {low}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  { fontStyle: "italic" },
                  { textAlign: "right", fontSize: 14 }
                ]}
              >
                Max
              </Text>
              <Text
                style={[{ fontWeight: "bold" }, { fontSize: 18, color: "#000000" }]}
              >
                {high}
              </Text>
            </View>
          </View>
          <RangeSlider
            // style={styles.slider}
            min={0}
            max={100}
            step={3}
            minRange={20}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
        </View>
      </View> */}
{/* 
      <View style={{ flex: 1, paddingHorizontal: 20, maxHeight: 80, }}>
        <View style={{ flex: 1, padding: 0,paddingHorizontal:40, flexDirection: "column", justifyContent: "space-evenly" }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 0 }}>
            <View>
              <Text
                style={[
                  { fontStyle: "italic" },
                  { textAlign: "left", fontSize: 14 }
                ]}
              >
                Min
              </Text>
              <Text
                style={[{ fontWeight: "bold" }, { fontSize: 18, color: "#000000" }]}
              >
                {low}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  { fontStyle: "italic" },
                  { textAlign: "right", fontSize: 14 }
                ]}
              >
                Max
              </Text>
              <Text
                style={[{ fontWeight: "bold" }, { fontSize: 18, color: "#000000" }]}
              >
                {high}
              </Text>
            </View>
          </View>
          <RangeSlider
            // style={styles.slider}
            min={0}
            max={100}
            step={3}
            minRange={20}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
        </View>
      </View> */}
{/* 
      <View style={{ flex: 1, paddingHorizontal: 20, maxHeight: 160 }}>
        <View style={{ flex: 1, padding: 40, flexDirection: "column", justifyContent: "space-evenly" }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <View>
              <Text
                style={[
                  { fontStyle: "italic" },
                  { textAlign: "left", fontSize: 14 }
                ]}
              >
                Min
              </Text>
              <Text
                style={[{ fontWeight: "bold" }, { fontSize: 18, color: "#000000" }]}
              >
                {low}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  { fontStyle: "italic" },
                  { textAlign: "right", fontSize: 14 }
                ]}
              >
                Max
              </Text>
              <Text
                style={[{ fontWeight: "bold" }, { fontSize: 18, color: "#000000" }]}
              >
                {high}
              </Text>
            </View>
          </View>
          <RangeSlider
            // style={styles.slider}
            min={0}
            max={100}
            step={3}
            minRange={20}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
        </View>
      </View> */}





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
