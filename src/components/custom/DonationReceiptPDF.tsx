// components/DonationReceiptPDF.tsx
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    color: "#333",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
    textAlign: "center",
    color: "#555",
  },
  borderBox: {
    border: "1px solid #ccc",
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#f8f8f8",
  },
});

interface Props {
  date: string;
  trxId: string;
  projectName: string;
  amount: number | string;
  status: string;
  paymentMethod: string;
}

const DonationReceiptPDF = ({
  date,
  trxId,
  projectName,
  amount,
  status,
  paymentMethod,
}: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Donation Receipt</Text>

      <View style={styles.borderBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text>{date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text>{trxId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Project Name:</Text>
          <Text>{projectName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text>Tk. {amount.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text>{status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text>{paymentMethod}</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Thank you for your generous contribution.
      </Text>
    </Page>
  </Document>
);

export default DonationReceiptPDF;
