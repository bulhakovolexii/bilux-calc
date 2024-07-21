import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
  },
});

const PdfReport = ({ inputData, barData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>{JSON.stringify(inputData)}</Text>
        <Text style={styles.text}>{JSON.stringify(barData)}</Text>
      </View>
    </Page>
  </Document>
);

const PdfPreview = ({ inputData, barData }) => (
  <PDFViewer width="100%" height="900px">
    <PdfReport inputData={inputData} barData={barData} />
  </PDFViewer>
);

export { PdfReport, PdfPreview };
