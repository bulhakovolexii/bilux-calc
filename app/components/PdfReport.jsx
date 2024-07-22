import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
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

const PdfReport = ({ inputData, img }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        {/* <Text style={styles.text}>{JSON.stringify(inputData)}</Text> */}
      </View>
      <View>
        <Image style={styles.barChart} src={img} />
      </View>
    </Page>
  </Document>
);

const PdfPreview = ({ inputData, img }) => {
  return (
    <PDFViewer width="100%" height="900px">
      <PdfReport inputData={inputData} img={img} />
    </PDFViewer>
  );
};

export { PdfReport, PdfPreview };
