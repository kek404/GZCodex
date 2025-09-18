{{- define "agents.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "agents.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "agents.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
