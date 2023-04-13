import { useEffect, useState } from "react";
import { AdminService } from "@/services/adminServices";
import Swal from "sweetalert2";
import { Button, Container, Table, Text } from "@nextui-org/react";

export default function ManageTokensTable({ onChange, setChange }) {
  const [tokens, setTokens] = useState([]);
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "token",
      label: "Token",
    },
    {
      key: "tokenExpiryDate",
      label: "Token Expiry Date",
    },
    {
      key: "requestedFuelAmount",
      label: "Requested fuel amount",
    },
    {
      key: "fuelType",
      label: "Fuel Type",
    },
    {
      key: "date",
      label: "Date",
    },
  ];
  const rows = [];

  useEffect(() => {
    getTokens();
    console.log("get tokens");
  }, [onChange]);

  const getTokens = () => {
    AdminService.getAllTokens()
      .then((res) => {
        console.log("tokens", res.data);
        const tokens = res.data.data.filter((t) => {
          if (t.status === "Paid" || t.status === "Issued") {
            return t;
          }
        });
        setTokens(tokens);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeStatus = (token, status) => {
    console.log("token", token);
    AdminService.tokenIssued({ status: status,issuedFuelAmount: token.issuedFuelAmount ? token.issuedFuelAmount + token.requestedFuelAmount : token.requestedFuelAmount }, token._id)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: res.data.message,
        }).then(() => {
          const updatedTokens = tokens.map((t) => {
            if (t._id === token._id) {
              return { ...t, status: status };
            }
            return t;
          });
          setTokens(updatedTokens);
        });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: e,
        });
      });
  };

  return (
    <Container>
      <Container display="flex" justify="space-between">
        <Text h4 style={{ margin: "0" }}>
          Token Management
        </Text>
      </Container>
      <Table
        aria-label="table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          {columns.map((column, i) => (
            <Table.Column key={i}>{column?.label}</Table.Column>
          ))}
          <Table.Column width={"fit-content"}></Table.Column>
        </Table.Header>
        <Table.Body>
          {tokens.map((token, ri) => (
            <Table.Row key={ri}>
              <Table.Cell>{token._id}</Table.Cell>
              <Table.Cell>{token.token}</Table.Cell>
              <Table.Cell>
                {new Date(token.expireDate).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{token.requestedFuelAmount}</Table.Cell>
              <Table.Cell>{token.fuelType}</Table.Cell>
              <Table.Cell>
                {token.createdDate.toString().split(".")[0].replace("T", " ")}
              </Table.Cell>
              <Table.Cell
                css={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {token.status === "Paid" && (
                  <>
                    <Button
                      css={{ width: "fit-content", alignSelf: "center" }}
                      size={"xs"}
                      onClick={() => onChangeStatus(token, "Issued")}
                    >
                      Issue
                    </Button>
                  </>
                )}
                {token.status !== "Paid" && <>{token.status}</>}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
