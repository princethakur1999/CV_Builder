import { useSelector } from "react-redux";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

function ProgressBar() {
  const user = useSelector((state) => state.user) || {};
  const education = useSelector((state) => state.education.value) || [];
  const skills = useSelector((state) => state.skills.value) || [];
  const projects = useSelector((state) => state.projects.value) || [];
  const languages = useSelector((state) => state.languages.value) || [];

  const calculateProgress = () => {
    let points = 0;

    // Check filled user fields (excluding photo)
    Object.entries(user).forEach(([key, value]) => {
      if (value && key !== "photo") points += 3; // 3 points per filled field
    });

    // Check filled education fields
    if (Array.isArray(education)) {
      education.forEach((edu) => {
        if (edu.qualification && edu.board && edu.percentage && edu.year) {
          points += 10;
        }
      });
    }

    // Add points for skills, projects, and languages
    if (skills.length >= 4) points += 10;
    if (projects.length >= 2) points += 10;
    if (languages.length >= 2) points += 10;

    return Math.min(points, 100); // Cap at 100
  };

  const progress = calculateProgress();

  // Resume PDF Document
  const ResumeDocument = () => (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {user.photo && <Image src={user.photo} style={styles.profilePhoto} />}

          <View style={styles.headerText}>
            <Text style={styles.name}>
              {user.firstName} {user.lastName}
            </Text>

            <View style={styles.contactRow}>
              <Text style={styles.contact}>{user.email}</Text>
              <Text style={styles.contact}>{user.phone}</Text>
            </View>

            <View style={styles.contactRow}>
              <Text style={styles.contact}>
                {user.state}, {user.country}
              </Text>
              <Text style={styles.contact}>
                {new Date(user.dob).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>

            <View style={styles.contactRow}>
              <Text style={styles.contact}>Github: {user.github}</Text>
              <Text style={styles.contact}>LinkedIn: {user.linkedin}</Text>
            </View>
          </View>
        </View>
        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Qualification</Text>
              <Text style={styles.tableHeaderCell}>Board/University</Text>
              <Text style={styles.tableHeaderCell}>Percentage</Text>
              <Text style={styles.tableHeaderCell}>Year</Text>
            </View>
            {education.length > 0 ? (
              education.map((edu, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{edu.qualification}</Text>
                  <Text style={styles.tableCell}>{edu.board}</Text>
                  <Text style={styles.tableCell}>{edu.percentage}%</Text>
                  <Text style={styles.tableCell}>{edu.year}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noData}>No education details added.</Text>
            )}
          </View>
        </View>
        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.length > 0 ? (
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text style={styles.skill} key={index}>
                  • {skill}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.noData}>No skills added.</Text>
          )}
        </View>
        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <View key={index} style={styles.project}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  <Text style={styles.projectLink}>{project.link}</Text>
                </View>
                <Text style={styles.projectDescription}>
                  {project.description}
                </Text>
                {index < projects.length - 1 && (
                  <View style={styles.projectSpacer} />
                )}
              </View>
            ))
          ) : (
            <Text>No projects added.</Text>
          )}
        </View>
        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {languages.length > 0 ? (
            languages.map((language, index) => (
              <Text key={index} style={styles.language}>
                • {language}
              </Text>
            ))
          ) : (
            <Text style={styles.noData}>No languages added.</Text>
          )}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-0">
      <label className="font-bold text-lg text-green-600 mb-2 text-center sm:text-left">
        Profile Completion: {progress}%
      </label>
      <div className="w-full bg-gray-300 rounded-full h-4">
        <div
          className="bg-green-600 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress === 100 && (
        <PDFDownloadLink
          document={<ResumeDocument />}
          fileName="resume.pdf"
          className="mt-8 px-4 py-2 rounded font-bold bg-green-600 text-white hover:bg-green-700"
        >
          {({ loading }) => (loading ? "Generating..." : "Download Resume")}
        </PDFDownloadLink>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "3px solid #ccc",
    paddingBottom: 10,
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contact: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 3,
    flex: 1,
  },
  link: {
    color: "#3498db",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#34495e",
    borderBottom: "2px solid #ddd",
    paddingBottom: 5,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    fontSize: 12,
    marginBottom: 5,
    marginRight: 10,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1,
  },
  projectLink: {
    fontSize: 12,
    color: "#3498db",
  },
  projectDescription: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "justify",
  },
  projectSpacer: {
    marginTop: 15,
  },
  language: {
    fontSize: 12,
    marginBottom: 5,
  },
  noData: {
    fontSize: 12,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
});

export default ProgressBar;
