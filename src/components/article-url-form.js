import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function ArticleUrlForm({
  articleUrl = "",
  onArticleUrlChange = () => {},
  onSubmit = () => {},
  onVoiceIdChange = () => {},
  submitButtonText = "",
  voiceId = "",
  voicesIds = ["Matthew"],
}) {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="articleUrl">
          <strong>Enter an article URL:</strong>
        </Label>
        <Input
          id="articleUrl"
          name="articleUrl"
          onChange={onArticleUrlChange}
          type="text"
          value={articleUrl}
        />
      </FormGroup>

      <FormGroup>
        <Label for="voiceIdSelect">
          <strong>Voice</strong>
        </Label>
        <Input
          id="voiceIdSelect"
          name="select"
          onChange={onVoiceIdChange}
          type="select"
          value={voiceId}
        >
          {voicesIds.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup style={{ textAlign: "center" }}>
        <Button type="submit">{submitButtonText}</Button>
      </FormGroup>
    </Form>
  );
}
