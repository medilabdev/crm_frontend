import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2",
});

// Daftarkan font Roboto dengan varian Bold
Font.register({
    family: "Roboto",
    fonts: [
        { src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKOzY.woff2", fontWeight: "bold" },
        { src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2", fontWeight: "normal" },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        flexDirection: "column",
        padding: '35 45',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingBottom: 10,
    },
    titleHeader: {
        fontFamily: "Roboto",
        fontSize: 12,
        textAlign: "center",
        borderBottom: "2 solid black",
        marginBottom: 10,
        paddingBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%", // Memastikan lebar penuh
    },
    col: {
        flex: 1, // Membuat kolom menyesuaikan ukuran
    },
    section: {
        paddingBottom: 5,
        marginBottom: 8,
        borderBottom: "2 solid black",
    },
    title: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
        marginBottom: 5,
        textAlign: "justify"
    },
    textBold: {
        fontSize: 10,
        marginBottom: 5,
        fontWeight: "bold"
    },
    table: {
        fontSize: 10,
        width: "100%",
        border: "1 solid black",
        marginTop: 10,
    },
    machineContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    machineBox: {
        width: "100%",
        // border: "1 solid black",
        padding: 5,
        marginBottom: 5,
    },
});

const GeneratePDF = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                {/* Header */}
                <View style={styles.header}>
                    <Image src={data.logo} style={{ height: 45, marginRight: 20 }} />
                    <View style={styles.col}>
                        <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold", color: "#53C8CD", marginBottom: 10 }}>INTERSKALA SEHAT SEJAHTERA</Text>
                        <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold" }}>Green Sedayu Bizpark, Jalan Daan Mogot KM. 18 Blok DM 15 Nomor 116</Text>
                        <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold" }}>Kalideres, Jakarta Barat, DKI Jakarta 11840</Text>
                        <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold" }}>Telp (021) 22306173</Text>
                    </View>
                </View>

                <View style={styles.titleHeader}>
                    <Text style={{ fontSize: 12, fontWeight: "bold", textAlign: "center" }}>ACTIVITY REPORT</Text>
                </View>

                {/* Informasi Teknisi */}
                <View style={styles.section}>
                    <Text style={styles.title}>TECHNICIAN</Text>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Name              : {data.technician.name}</Text>
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.text}>Date Arrived      : {data.technician.dateArrived}</Text>
                            <Text style={styles.text}>Date Report       : {data.technician.dateReport}</Text>
                        </View>
                    </View>
                </View>

                {/* Informasi Pelanggan */}
                <View style={styles.section}>
                    <Text style={styles.title}>CUSTOMER</Text>
                    <Text style={styles.text}>Name          : {data.customer.name}</Text>
                    <Text style={styles.text}>Address       : {data.customer.address}</Text>
                </View>

                {/* Deskripsi Pekerjaan */}
                {/* <View style={styles.section}>
                    <Text style={styles.title}>JOB DESCRIPTION</Text>
                    <Text style={styles.text}>{data.jobDescription}</Text>
                </View> */}

                {/* Completion Pekerjaan */}
                {/* <View style={styles.section}>
                    <Text style={styles.title}>COMPLETION</Text>
                    <Text style={styles.text}>{data.completion}</Text>
                </View> */}

                {/* Tabel Mesin dengan Dua Kolom */}
                <View style={styles.section}>
                    <Text style={styles.title}>DETAILS</Text>
                    <View style={styles.machineContainer}>
                        {data.machines.reduce((acc, machine, index) => {
                            // Jika index genap , buat pasangan dengan item berikutnya (jika ada)
                            if (index % 2 === 0) {
                                acc.push([machine, data.machines[index + 1] || null]);
                            }

                            return acc;
                        }, []).map(([leftMachine, rightMachine], index) => (
                            <View style={styles.row} key={index}>
                                {/* Mesin di kiri (Index ganjil) */}
                                <View style={styles.col}>
                                    {leftMachine && (
                                        <View style={styles.machineBox}>
                                            {leftMachine?.machine && (
                                                <>
                                                    <Text style={styles.title}>MACHINE</Text>
                                                    <Text style={styles.text}><Text style={styles.textBold}>Name</Text> : {leftMachine?.machine?.name}</Text>
                                                    <Text style={styles.text}><Text style={styles.textBold}>Model</Text> : {leftMachine?.machine?.model}</Text>
                                                    <Text style={styles.text}><Text style={styles.textBold}>Serial Number</Text> : {leftMachine?.machine?.sn}</Text>
                                                </>
                                            )}

                                            <Text style={styles.text}><Text style={styles.textBold}>Job Description</Text> : {leftMachine?.jobdesc}</Text>
                                            <Text style={styles.text}><Text style={styles.textBold}>Notes</Text> : {leftMachine?.notes}</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Mesin di kanan (Index genap) */}
                                <View style={styles.col}>
                                    {rightMachine && (
                                        <View style={styles.machineBox}>
                                            {rightMachine?.machine && (
                                                <>
                                                    <Text style={styles.title}>MACHINE</Text>
                                                    <Text style={styles.text}><Text style={styles.textBold}>Name</Text> : {rightMachine?.machine?.name}</Text>
                                                    <Text style={styles.text}><Text style={styles.textBold}>Model</Text> : {rightMachine?.machine?.model}</Text>
                                                    <Text style={styles.text}><Text style={styles.textBold}>Serial Number</Text> : {rightMachine?.machine?.sn}</Text>
                                                </>
                                            )}

                                            <Text style={styles.text}><Text style={styles.textBold}>Job Description</Text> : {rightMachine?.jobdesc}</Text>
                                            <Text style={styles.text}><Text style={styles.textBold}>Notes</Text> : {rightMachine?.notes}</Text>

                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>

                </View>

                {/* Purpose of visit Pekerjaan */}
                <View style={styles.section}>
                    <Text style={styles.title}>PURPOSE OF VISIT</Text>
                    <Text style={styles.text}>{data.purposeOfVisit.name}</Text>
                </View>

                {/* Suggestion & Feedback Pekerjaan */}
                <View style={styles.section}>
                    <Text style={styles.title}>SUGGESTION & FEEDBACK</Text>
                    <Text style={styles.text}>{data.completion}</Text>
                </View>

                {/* Signature */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.title}>TECHNICIAN SIGNATURE</Text>
                            <Image src={data.technician.signature} style={{ width: 60, height: 60 }} />
                            <Text style={styles.text}>Name : {data.technician.name}</Text>
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.title}>CUSTOMER SIGNATURE</Text>
                            <Image src={data.signatures.signature} style={{ width: 80, height: 80 }} />
                            <Text style={styles.text}>Name : {data.signatures.name}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>Task : {data.status}</Text>

            </Page>
        </Document>
    )
}

export default GeneratePDF
