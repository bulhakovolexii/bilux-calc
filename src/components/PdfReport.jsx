import React from "react";
import {
  Page,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Svg,
  Path,
  Text,
} from "@react-pdf/renderer";
import materials from "@/model/reference-data/materials";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const numberFormatter = (number, digits = 0) => {
  const toFixedNumber = +number.toFixed(digits);
  return toFixedNumber.toLocaleString("uk-UA", { useGrouping: true });
};

const Logo = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40">
    <Path
      d="M11.7256 20.1746H13.4236C13.5102 20.1746 13.5859 20.1963 13.64 20.2287C13.6941 20.2608 13.7161 20.3369 13.7161 20.4331C13.7161 20.5933 13.6184 20.6695 13.4345 20.6695H11.736V20.1726H11.7256V20.1746ZM10.7411 18.2714V21.4512H13.6941C14.0403 21.4512 14.2891 21.3863 14.4406 21.2565C14.592 21.1267 14.6678 20.8999 14.6678 20.5753C14.6678 20.2067 14.5163 19.9583 14.2242 19.8284C14.3108 19.7852 14.3973 19.7094 14.4514 19.6013C14.5163 19.4931 14.5488 19.3528 14.5488 19.1797C14.5488 18.8031 14.4406 18.5547 14.235 18.4144C14.0948 18.3303 13.8784 18.2862 13.5643 18.2862H10.7411V18.2782V18.2714ZM11.7256 19.0391H13.4565C13.5318 19.0391 13.5967 19.0607 13.64 19.0932C13.6833 19.1252 13.7049 19.1797 13.7049 19.2555C13.7049 19.3308 13.6833 19.3849 13.64 19.4173C13.5858 19.4543 13.5213 19.4732 13.4557 19.4714H11.7256V19.0391ZM15.1874 18.271H16.1611V21.4404H15.1874V18.271ZM16.8206 18.271H17.7943V20.6182H20.0112V21.4436H16.8206M24.684 18.2742V20.2095C24.684 20.7825 24.5542 21.1511 24.3053 21.2913C24.0782 21.4316 23.5268 21.4997 22.6614 21.4997C21.7959 21.4997 21.2441 21.4356 21.0174 21.2953C20.7689 21.1431 20.6387 20.7865 20.6387 20.2135V18.2742H21.6084V20.2135C21.6084 20.4098 21.6604 20.526 21.7686 20.5821C21.8969 20.6462 22.1893 20.6823 22.6421 20.6823C23.0949 20.6823 23.3754 20.6502 23.5076 20.5982C23.6238 20.534 23.6879 20.4138 23.6879 20.2203V18.285H24.6736L24.684 18.2742ZM25.0626 18.2742L26.5123 19.8208L25.0626 21.4436H26.3825L27.3345 20.3858L28.2861 21.4476H29.6064L28.1455 19.8248L29.606 18.2782H28.2517L27.3341 19.2959L26.4125 18.2822"
      fill="black"
    />
    <Path
      d="M6.73946 34.9285C6.55515 34.7667 6.37084 34.5936 6.18732 34.4205L6.17651 34.4097C5.51521 33.7705 4.89744 33.0879 4.32736 32.3662C3.86625 31.7869 3.43984 31.1808 3.05039 30.5511L3.03957 30.5631C3.00752 30.511 2.97547 30.4469 2.93139 30.3708C2.74788 30.0703 2.56397 29.7538 2.40169 29.4412C2.38005 29.3971 2.35842 29.3571 2.3476 29.321C3.00471 28.119 5.20045 25.0257 6.14205 23.8357C7.10368 22.6256 8.10939 21.5117 8.81459 21.0149L10.3171 19.9331C10.0567 20.8747 9.80828 21.8163 9.53582 22.7458C9.13513 24.0761 8.67836 25.6468 8.67836 26.985C8.67836 27.8946 8.97086 28.8682 9.35952 29.6896L9.77222 28.4876L10.6257 29.5374C11.8918 31.104 12.7012 32.1098 14.8529 33.0313C15.2736 33.2156 15.7183 33.3759 16.1711 33.4761L16.3674 32.5345L14.8529 28.4596L18.8436 30.9358C19.7291 31.3685 20.835 31.4446 21.8928 31.4526V30.3387L24.7477 29.7978L25.0189 29.289L21.0077 27.798L19.8938 25.2016C21.777 25.6985 23.6482 26.2073 25.5514 26.608C26.8721 26.8777 28.1479 27.0828 28.7112 26.9967C29.6728 26.8452 30.6585 26.4237 31.4571 25.8607L29.2093 22.9919C29.8383 22.9478 30.465 22.9049 31.0925 22.8717C32.1198 22.8184 33.3643 22.7535 33.8291 22.3964C34.0992 22.1889 34.4341 21.7241 34.7587 21.2826L29.622 18.4457L30.7679 17.1684C31.8497 16.94 32.607 16.5625 33.148 15.524C33.3964 15.0472 33.3643 14.7346 33.3743 14.2258L28.6062 15.082L29.9589 12.734L27.8153 12.3654L26.8617 10.7226L21.5286 14.3776L19.1165 14.4337L25.2509 7.17337L24.7501 6.8368L20.49 8.61983L18.2831 7.11327L15.3513 9.93407L13.2317 15.645C12.5826 15.0279 11.9776 14.5086 11.6971 13.6215C11.3725 12.5942 11.3285 11.2315 11.3204 10.5499L11.169 10.4417C10.9847 11.2751 10.8869 12.0857 10.1312 12.6266C9.83873 12.831 9.48213 12.9953 9.04939 13.0806L8.1719 16.3702L6.96985 16.3157L7.02475 17.8724C7.02475 18.8356 7.64981 19.1601 8.19073 19.7656L8.59141 20.2195C6.7595 22.1524 3.21347 26.394 1.89282 28.7196L1.31023 27.1089C0.91319 26.0735 0.605545 25.0061 0.390671 23.9182C0.129741 22.629 -0.0011367 21.3169 7.43671e-06 20.0016C7.43671e-06 14.485 2.23981 9.47689 5.86277 5.86435C9.48653 2.23859 14.4838 -0.0012207 20.0004 -0.0012207C25.517 -0.0012207 30.5251 2.23939 34.138 5.86475C37.7614 9.48771 40 14.485 40 20.0016C40 25.5182 37.7614 30.5263 34.138 34.1392C30.5143 37.7517 25.517 40.0012 20.0004 40.0012C17.4461 40.0027 14.9155 39.5107 12.5477 38.5523C10.4385 37.6868 8.47 36.4756 6.73946 34.9285ZM3.87219 29.2605C4.32545 30.05 4.83524 30.8057 5.39758 31.5216C6.07073 32.3758 6.82801 33.1656 7.64941 33.9016C11.0583 36.9259 15.4573 38.5961 20.0144 38.5964C25.1552 38.5964 29.8071 36.5088 33.1808 33.1471C34.9132 31.4211 36.287 29.3694 37.2229 27.1101C38.1589 24.8508 38.6385 22.4286 38.6341 19.9831C38.6341 14.8452 36.5465 10.1945 33.1848 6.81917C29.8191 3.45345 25.1592 1.3659 20.0184 1.3659C14.8777 1.3659 10.2214 3.45185 6.84765 6.82638C3.48193 10.1921 1.39438 14.8536 1.39438 19.9916C1.39438 21.2136 1.51338 22.4357 1.7622 23.637C1.90324 24.351 2.08675 25.0538 2.31434 25.7353C2.71502 25.184 3.14696 24.5998 3.38496 24.2756C4.42353 22.8452 5.59151 21.5149 6.80277 20.2288C6.28389 19.7399 5.73215 19.1469 5.73215 17.8688L5.62397 14.9358L7.19263 15.0119L8.02605 11.8746C8.6431 11.8185 9.54062 11.8064 9.7049 11.0532L10.346 8.10816L12.6619 9.90321V10.2478C12.6619 10.6365 12.6619 11.8706 12.8783 12.8522L14.2246 9.20603L18.1513 5.43161L20.6395 7.12649L24.8907 5.34146L26.4494 6.36921L27.3789 6.68294L23.2235 11.5945L27.2904 8.80575L28.6431 11.1537L32.0289 11.7371L31.1526 13.2733L34.7106 12.6363L34.6786 14.8881C34.6786 15.2767 34.5263 15.7215 34.3179 16.1342C33.8091 17.1199 33.0077 17.8772 31.9579 18.2338L36.726 20.8542C36.4335 21.2341 36.1531 21.5995 35.8806 21.9801C35.4919 22.5211 35.0792 23.094 34.6345 23.441C33.9734 23.9391 32.8595 24.0797 31.8097 24.1446L33.2922 26.027C32.0581 27.173 30.6317 28.0172 28.9328 28.2869C28.1875 28.4063 26.7491 28.1899 25.2986 27.8862C25.0848 27.8464 24.8723 27.7997 24.6615 27.7459L26.8785 28.5794L25.6348 30.9794L23.2227 31.4342V32.7765C21.5358 32.7765 19.7608 32.8751 18.205 32.0953L17.4276 31.6197L17.7289 32.4531L17.2201 34.8757C16.1703 34.8757 15.3048 34.6813 14.3312 34.2706C12.2877 33.4052 11.3233 32.4852 10.2418 31.1974L9.92848 32.107L9.21527 31.6422C8.69679 31.3056 8.24162 30.5483 7.91706 29.7053C7.56046 28.7853 7.34409 27.7259 7.34409 27.0007C7.34409 25.9729 7.57248 24.869 7.84254 23.8313C6.39207 25.5302 5.09467 27.3893 3.86137 29.2725L3.87219 29.2605Z"
      fill="black"
    />
  </Svg>
);

function findParentNameById(id) {
  for (const material of materials) {
    if (material.id === id.split("-")[0]) {
      for (const subtype of material.subtypes) {
        if (subtype.id === id.split("-")[0] + "-" + id.split("-")[1]) {
          for (const name of subtype.names) {
            if (
              name.id ===
              id.split("-")[0] + "-" + id.split("-")[1] + "-" + id.split("-")[2]
            ) {
              for (const variant of name.variants) {
                if (variant.id === id) {
                  return name.name;
                }
              }
            }
          }
        }
      }
    }
  }

  return null;
}

const directionsUA = {
  north: "Північ",
  east: "Схід",
  south: "Південь",
  west: "Захід",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: "30 30 54 30",
  },
  header: {
    display: "flex",
    margin: "-30 -30 16 -30",
    padding: "8 16",
    backgroundColor: "#f4e982",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerEmail: {
    display: "flex",
    alignItems: "center",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle2: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
  },
  result: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  divider: {
    borderBottom: "1px solid black",
    marginBottom: 8,
  },
  barChart: {
    marginTop: -24,
    zIndex: -1,
  },
  footer: {
    fontSize: 8,
    display: "flex",
    padding: "8 16",
    backgroundColor: "#f4e982",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  row: {
    fontSize: 12,
    marginBottom: 4,
    borderBottom: "1px solid black",
  },
  innerRow: {
    fontSize: 12,
    margin: "0 0 4 16",
    borderBottom: "1px solid black",
  },
  innerSubRow: {
    fontSize: 12,
    margin: "0 0 4 24",
    borderBottom: "1px solid black",
  },
});

const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
};

const PdfReport = ({ email, inputData, img, results }) => {
  const PageTemplate = ({ children }) => (
    <Page style={styles.page}>
      <View fixed style={styles.header}>
        <Logo size={40} />
        <View style={styles.headerEmail}>
          <Text style={styles.text}>Full report for</Text>
          <Text style={styles.text}>
            {email || "email@google.com"} {getCurrentDate()}
          </Text>
        </View>
        <Text>Bilux-CALC</Text>
      </View>
      <View style={styles.content}>{children}</View>
      <View fixed style={styles.footer}>
        <Logo size={30} />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
        <Text>Bilux-CALC</Text>
      </View>
    </Page>
  );

  return (
    <Document>
      <PageTemplate>
        <View style={styles.section}>
          <Text style={styles.title}>Результати розрахунку</Text>
          <View style={styles.result}>
            <Text style={styles.text}>Температура повітря в будівлі:</Text>
            <Text style={styles.text}>{results.indoorTemp}, °C</Text>
          </View>
          <View style={styles.result}>
            <Text style={styles.text}>
              Потужність системи, (повна [питома]):
            </Text>
            <Text style={styles.text}>
              {numberFormatter(results.estimatedHeatGeneratorPower.full, 2)}
              &nbsp; [
              {numberFormatter(results.estimatedHeatGeneratorPower.specific, 2)}
              ], кВт [кВт/м²]
            </Text>
          </View>
          <View style={styles.result}>
            <Text style={styles.text}>
              Енергоспоживання користувацької системи:
            </Text>
            <Text style={styles.text}>
              {numberFormatter(results.annualSystemA, 2)}, кВт·год
            </Text>
          </View>
          <View style={styles.result}>
            <Text style={styles.text}>Енергоспоживання системи BILUX:</Text>
            <Text style={styles.text}>
              {numberFormatter(results.annualSystemB, 2)}, кВт·год
            </Text>
          </View>
          <View style={styles.result}>
            <Text style={styles.text}>Скорочення енергоспоживання:</Text>
            <Text style={styles.text}>
              {numberFormatter(results.savings, 2)}, кВт·год&nbsp; (
              {numberFormatter(results.savingsInPercentage, 2)} %)
            </Text>
          </View>
          {results.userResource.type !== "Електроенергія" && (
            <View style={styles.result}>
              <Text style={styles.text}>
                Ціна користувацького енергоресурсу ({results.userResource.type}
                ):
              </Text>
              <Text style={styles.text}>
                {numberFormatter(results.userResource.rate, 2)}&nbsp; грн/
                {results.userResource.units}
              </Text>
            </View>
          )}
          <View style={styles.result}>
            <Text style={styles.text}>Ціна електроенергії:</Text>
            <Text style={styles.text}>
              {numberFormatter(results.electricity.rate, 2)}&nbsp; грн/
              {results.electricity.units}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.result}>
            <Text style={styles.text}>Потенційна економія:</Text>
            <Text style={styles.text}>
              {numberFormatter(results.economy, 2)}&nbsp; грн/рік
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Розподіл витрат по місяцям</Text>
          <Image style={styles.barChart} src={img} />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Вихідні дані</Text>
          <Text style={styles.row}>Місто: {inputData.city}</Text>
          <Text style={styles.row}>Тип місцевості: {inputData.terrain}</Text>
          <Text style={styles.row}>
            Функційне призначення: {inputData.purpose}
          </Text>
          <Text style={styles.row}>
            Клас теплоємності: {inputData.heatCapacityClass}
          </Text>
          <Text style={styles.row}>
            Рівень герметичності: {inputData.airPermeabilityClass}
          </Text>
          <Text style={styles.row}>
            Тип зовнішніх стін: {inputData.constructionType}
          </Text>
          <Text style={styles.row}>Ширина: {inputData.buildingWidth}, м</Text>
          <Text style={styles.row}>Довжина: {inputData.buildingLength}, м</Text>
          <Text style={styles.row}>
            Висота поверху: {inputData.floorHeight}, м
          </Text>
          <Text style={styles.row}>
            Кількість поверхів: {inputData.numberOfFloors}
          </Text>
          <Text style={styles.subtitle}>Дах</Text>
          <Text style={styles.row}>Тип даху: {inputData.ceiling.type}</Text>
          <Text style={styles.text}>Шари конструкції:</Text>
          {inputData.ceiling.layers.map((layer, index) => (
            <Text style={styles.innerRow}>
              {index + 1}. Товщина:&nbsp;{layer.thickness}, мм; Матеріал:&nbsp;
              {findParentNameById(layer.material.id)}, густина:{" "}
              {layer.material.density}, кг/м³, теплопровідність:{" "}
              {layer.material.conductivity}, Вт/(м∙К)
            </Text>
          ))}
          <Text style={styles.subtitle}>Підлога</Text>
          <Text style={styles.row}>Тип підлоги: {inputData.floor.type}</Text>
          <Text style={styles.row}>
            Висота стін що контактують з ґрунтом:{" "}
            {inputData.floor.wallTotalThickness || "-/-"}, м
          </Text>
          <Text style={styles.text}>Шари конструкції:</Text>
          {inputData.floor.layers.map((layer, index) => (
            <Text style={styles.innerRow}>
              {index + 1}. Товщина:&nbsp;{layer.thickness}, мм; Матеріал:&nbsp;
              {findParentNameById(layer.material.id)}, густина:{" "}
              {layer.material.density}, кг/м³, теплопровідність:{" "}
              {layer.material.conductivity}, Вт/(м∙К)
            </Text>
          ))}
          <Text style={styles.subtitle}>Вертикальні конструкції</Text>
          {inputData.facades.map((facade) => (
            <View>
              <Text style={styles.subtitle2}>
                {directionsUA[facade.direction]}
              </Text>
              <Text style={styles.innerRow}>Шари конструкції:</Text>
              {facade.layers.map((layer, index) => (
                <View>
                  <Text style={styles.innerSubRow}>
                    {index + 1}. Товщина:&nbsp;{layer.thickness}, мм;
                    Матеріал:&nbsp;
                    {findParentNameById(layer.material.id)}, густина:{" "}
                    {layer.material.density}, кг/м³, теплопровідність:{" "}
                    {layer.material.conductivity}, Вт/(м∙К)
                  </Text>
                </View>
              ))}
              <Text style={styles.innerRow}>Вікна:</Text>
              {facade.windows?.map((window, index) => (
                <View>
                  <Text style={styles.innerSubRow}>
                    {index + 1}. Ширина:&nbsp;{window.width}, м; Висота:&nbsp;
                    {window.height}, м; Кількість: {window.quantity}, шт; Тип:{" "}
                    {window.type.variant}&nbsp;(Повітря: {window.type.air} %,
                    Криптон: {window.type.krypton} %, Аргон: {window.type.argon}{" "}
                    %)
                  </Text>
                </View>
              ))}
              <Text style={styles.innerRow}>Двері:</Text>
              {facade.doors?.map((door, index) => (
                <View>
                  <Text style={styles.innerSubRow}>
                    {index + 1}. Ширина:&nbsp;{door.width}, м; Висота:&nbsp;
                    {door.height}, м; Кількість: {door.quantity}, шт; Тип:{" "}
                    {door.variant}
                  </Text>
                </View>
              ))}
              {facade.inclusions.map((inclusion, index) => (
                <View>
                  <Text style={styles.subtitle2}>(Включення {index + 1})</Text>
                  <Text style={styles.innerRow}>Шари конструкції:</Text>
                  {inclusion.layers.map((layer, index) => (
                    <View>
                      <Text style={styles.innerSubRow}>
                        {index + 1}. Товщина:&nbsp;{layer.thickness}, мм;
                        Матеріал:&nbsp;
                        {findParentNameById(layer.material.id)}, густина:{" "}
                        {layer.material.density}, кг/м³, теплопровідність:{" "}
                        {layer.material.conductivity}, Вт/(м∙К)
                      </Text>
                    </View>
                  ))}
                  <Text style={styles.innerRow}>Вікна:</Text>
                  {inclusion.windows?.map((window, index) => (
                    <View>
                      <Text style={styles.innerSubRow}>
                        {index + 1}. Ширина:&nbsp;{window.width}, м;
                        Висота:&nbsp;
                        {window.height}, м; Кількість: {window.quantity}, шт;
                        Тип: {window.type.variant}&nbsp;(Повітря:{" "}
                        {window.type.air} %, Криптон: {window.type.krypton} %,
                        Аргон: {window.type.argon} %)
                      </Text>
                    </View>
                  ))}
                  <Text style={styles.innerRow}>Двері:</Text>
                  {inclusion.doors?.map((door, index) => (
                    <View>
                      <Text style={styles.innerSubRow}>
                        {index + 1}. Ширина:&nbsp;{door.width}, м; Висота:&nbsp;
                        {door.height}, м; Кількість: {door.quantity}, шт; Тип:{" "}
                        {door.variant}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
          <Text style={styles.subtitle}>Система теплопостачання</Text>
          <Text style={styles.row}>
            Джерело теплопостачання: {inputData.system.heatGenerator}
          </Text>
          <Text style={styles.row}>
            Гідравлічна система: {inputData.system.type}
          </Text>
          <Text style={styles.row}>
            Труби ізольовані: {inputData.system.pipesInsulation ? "Так" : "Ні"}
          </Text>
          <Text style={styles.row}>
            Температурний напір: {inputData.system.temperatureGradient}
          </Text>
          <Text style={styles.row}>
            Налагодження системи: {inputData.system.hydraulicAdjustment}
          </Text>
          <Text style={styles.row}>
            Опалювальні прилади: {inputData.system.heatingDevices.type}
          </Text>
          <Text style={styles.row}>
            Умови монтажу приладів: {inputData.system.heatingDevices.subtype}
          </Text>
          <Text style={styles.row}>
            Регулювання температури приміщення: {inputData.system.controlType}
          </Text>
        </View>
      </PageTemplate>
    </Document>
  );
};

export { PdfReport };
